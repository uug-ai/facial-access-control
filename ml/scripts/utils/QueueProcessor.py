import requests
import traceback
from utils.MessageBrokers import SQS, Kafka, RabbitMQ


class QueueProcessor:
    """A class for processing messages from a source queue.

    This class is responsible for processing messages received from a source queue,
    fetching data associated with each message from a storage service, and performing
    necessary actions based on the received data.
    """

    def __init__(self, source_queue_name, target_queue_name, source_queue_system, storage_uri, storage_access_key, storage_secret):
        """ Initializes the QueueProcessor object with necessary attributes.
        """

        self.source_queue_name = source_queue_name
        self.target_queue_name = target_queue_name
        self.source_queue_system = source_queue_system
        self.storage_uri = storage_uri
        self.storage_access_key = storage_access_key
        self.storage_secret = storage_secret

        # Create an instance of the source queue based on the source queue system
        self.source_queue = self.CreateQueue()

    def CreateQueue(self):
        """ Creates and returns an instance of the appropriate message broker class.
        """

        if self.source_queue_system == "SQS":
            return SQS(queueName=self.source_queue_name)
        if self.source_queue_system == "KAFKA":
            return Kafka(queueName=self.source_queue_name)
        if self.source_queue_system == "RABBITMQ":
            return RabbitMQ(queueName=self.source_queue_name)

    def process_messages(self):
        """ Processes messages received from the source queue, fetches associated data from storage, and performs actions.
        """

        print('Checking queue for messages...')

        try:
            # Receive messages from the source queue
            messages = self.source_queue.ReceiveMessages()

        except Exception as e:
            print('Error occurred while trying to receive message:')
            print(e)
            traceback.print_exc()
            pass

        # Process each received message
        for body in messages:
            storage_source = body['source']
            key = body['payload']['key']

            # Update storage-related information if available in message payload
            if "data" in body:
                data = body['data']
                self.update_storage_info(data)

            # Create headers for accessing storage service
            headers = self.create_headers(key, storage_source)

            try:
                # Fetch data associated with the message from storage service
                resp = requests.get(self.storage_uri + "/storage/blob", headers=headers, timeout=10)

                if resp is None or resp.status_code != 200:
                    print('None response or non-200 status code, skipping...')
                    continue
                
                return resp
                
            except Exception as x:
                print(x)
                pass

    def update_storage_info(self, data):
        """ Updates storage-related information based on data received from message payloads.
        """

        if "storage_uri" in data and data['storage_uri'] != "":
            self.storage_uri = data['storage_uri']
        if "storage_access_key" in data and data['storage_access_key'] != "":
            self.storage_access_key = data['storage_access_key']
        if "storage_secret" in data and data['storage_secret'] != "":
            self.storage_secret = data['storage_secret']

    def create_headers(self, key, storage_source):
        """ Creates and returns headers required for accessing storage service based on message payload information.
        """

        return {
            'Content-Type': 'application/json',
            'X-Kerberos-Storage-FileName': '{0}'.format(key),
            'X-Kerberos-Storage-Provider': '{0}'.format(storage_source),
            'X-Kerberos-Storage-AccessKey': '{0}'.format(self.storage_access_key),
            'X-Kerberos-Storage-SecretAccessKey': '{0}'.format(self.storage_secret),
        }
