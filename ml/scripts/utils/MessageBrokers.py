import boto3
import os
import json
import sys
import pika
import time
from confluent_kafka import Producer, Consumer

# Parent class with the methods each child class should implement
class MessageBroker:
    """ A base class representing a message broker.

    This class defines the common interface for interacting with message brokers,
    such as receiving messages, sending messages, and closing the connection.

    Methods:
    --------
    ReceiveMessages: Receives messages from the message broker.
    SendMessage(self): Sends a message through the message broker.
    Close(self): Closes the connection to the message broker.
    """

    def __init__(self) -> None:
        """ Initializes the MessageBroker object.
        """
        pass

    def ReceiveMessages(self):
        """ Receives messages from the message broker.
        """
        raise NotImplementedError("ReceiveMessages method must be implemented in child class")

    def SendMessage(self):
        """ Sends a message through the message broker.
        """
        raise NotImplementedError("SendMessage method must be implemented in child class")

    def Close(self):
        """ Closes the connection to the message broker.
        """
        raise NotImplementedError("Close method must be implemented in child class")


class SQS(MessageBroker):
    """ A class representing a message broker using Amazon Simple Queue Service (SQS).

    This class inherits from the MessageBroker base class and provides
    implementation specific to SQS.
    """

    def __init__(self, queueName: str = ''):
        """ Initializes the SQS object.

        Parameters:
        -----------
        queueName : str, optional
            The name of the SQS queue. Defaults to an empty string.
        """

        # Set the queueName attribute
        self.queueName = queueName

        # Initialize SQS resource with the specified AWS credentials and region
        self.sqs = boto3.resource('sqs', use_ssl=True,
                                  region_name='eu-west-1',
                                  aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID', ''),
                                  aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY', '')
                                  )
        
        # Get the SQS queue object by its name
        self.queue = self.sqs.get_queue_by_name(QueueName=self.queueName)

    def ReceiveMessages(self) -> list[dict]:
        """ Receives messages from the SQS queue.
        """

        # List to store received messages
        messages = []

        # Iterate over messages received from the queue
        for message in self.queue.receive_messages(MessageAttributeNames=['Author'],
                                                   MaxNumberOfMessages=3,
                                                   WaitTimeSeconds=20,
                                                   VisibilityTimeout=10):
            # Delete the message from the FIFO queue, so other consumers can start processing
            response = message.delete()
            
            # If message deletion is successful, append the message to the list
            if response['ResponseMetadata']['HTTPStatusCode'] == 200:
                messages.append(json.loads(message.body))
        
        # Return the list of received messages
        return messages

    def SendMessage(self, message: str):
        """ Sends a message to the SQS queue.
        
        Parameters:
        -----------
        message : str
            The message to send to the queue.
        """

        # Send the message to the SQS queue
        self.queue.send_message(MessageBody=message)

    def Close(self) -> bool:
        """ Closes the connection to the SQS queue.
        """

        # Since SQS doesn't require explicit connection management, 
        # we just return True to indicate successful closure
        return True


class Kafka(MessageBroker):
    """ A class representing a message broker using Apache Kafka.

    This class inherits from the MessageBroker base class and provides
    implementation specific to Apache Kafka.
    """

    def __init__(self, queueName: str = ''):
        """ Initializes the Kafka object.

        Parameters:
        -----------
        queueName : str, optional
            The name of the Kafka topic. Defaults to an empty string.
        """

        # Set the queueName attribute
        self.queueName = queueName
        
        # Kafka consumer settings
        kafkaC_settings = {
            'bootstrap.servers': os.getenv('KAFKA_BROKER', ''),
            "group.id":             "mygroupanalysisdominantcolor",
            "session.timeout.ms":         60000,
            "max.poll.interval.ms":       60000,
            "queued.max.messages.kbytes": 1000000,
            "auto.offset.reset":          "earliest",
            "sasl.mechanisms":   os.getenv('KAFKA_MECHANISM', ''),
            "security.protocol": os.getenv('KAFKA_SECURITY', ''),
            "sasl.username":     os.getenv('KAFKA_USERNAME', ''),
            "sasl.password":     os.getenv('KAFKA_PASSWORD', ''),
        }
        
        # Initialize Kafka consumer
        self.kafka_consumer = Consumer(kafkaC_settings)
        self.kafka_consumer.subscribe([self.queueName])

        # Kafka producer settings
        kafkaP_settings = {
            'bootstrap.servers': os.getenv('KAFKA_BROKER', ''),
            "sasl.mechanisms":   os.getenv('KAFKA_MECHANISM', ''),
            "security.protocol": os.getenv('KAFKA_SECURITY', ''),
            "sasl.username":     os.getenv('KAFKA_USERNAME', ''),
            "sasl.password":     os.getenv('KAFKA_PASSWORD', ''),
        }
        
        # Initialize Kafka producer
        self.kafka_producer = Producer(kafkaP_settings)

    def ReceiveMessages(self) -> list[dict]:
        """ Receives messages from the Kafka topic.
        """

        # Poll for messages from the Kafka consumer
        msg = self.kafka_consumer.poll(timeout=3.0)
        
        # If no message is received, return an empty list
        if msg is None:
            return []
        
        # Otherwise, return the received message
        return [json.loads(msg.value())]

    def delivery_callback(self, err, msg):
        """ Callback function to handle message delivery.
        """

        # If there's an error, write it to stderr
        if err:
            sys.stderr.write('%% Message failed delivery: %s\n' % err)
        else:
            # Otherwise, write the delivery confirmation
            sys.stderr.write('%% Message delivered to %s [%d] @ %d\n' %
                             (msg.topic(), msg.partition(), msg.offset()))

    def SendMessage(self, message: str):
        """ Sends a message to the Kafka topic.
        """

        try:
            # Produce the message to the Kafka topic
            self.kafka_producer.produce(
                'kcloud-analysis-queue', message, callback=self.delivery_callback)
            
            # Poll for events from the Kafka producer
            self.kafka_producer.poll(0)
        
        except BufferError as e:
            # If there's a buffer error, print it to stderr
            print(e, file=sys.stderr)
            # Poll for events from the Kafka producer
            self.kafka_producer.poll(1)

    def Close(self) -> bool:
        """ Closes the connection to Kafka.
        """

        # Close the Kafka consumer and producer, and flush the producer's messages
        self.kafka_consumer.close()
        self.kafka_producer.flush()
        self.kafka_producer.close()
        
        # Return True to indicate successful closure
        return True


class RabbitMQ(MessageBroker):
    """ A class representing a message broker using RabbitMQ.

    This class inherits from the MessageBroker base class and provides
    implementation specific to RabbitMQ.
    """

    def __init__(self, queueName: str = ''):
        """ Initializes the RabbitMQ object.

        Parameters:
        -----------
        queueName : str, optional
            The name of the RabbitMQ queue. Defaults to an empty string.
        """

        # Set the queueName attribute
        self.queueName = queueName
        
        # Get the RabbitMQ exchange name from environment variables
        exchange = os.getenv('RABBITMQ_EXCHANGE', '')
        self.exchange = exchange
        
        # Establish connection to RabbitMQ
        self.Connect()

        # Declare quorum queue
        self.readChannel.queue_declare(queue=self.queueName, durable=True, arguments={
                                       'x-queue-type': 'quorum'})

        # Check if connection is open otherwise kill
        if not self.connection.is_open:
            print("Connection to RabbitMQ is not open")
            sys.exit(1)

    def Connect(self):
        """ Establishes a connection to RabbitMQ.
        """

        host = os.getenv('RABBITMQ_HOST', '')
        username = os.getenv('RABBITMQ_USERNAME', '')
        password = os.getenv('RABBITMQ_PASSWORD', '')

        # Check if required credentials are provided
        if host and username and password:
            protocol = ''
            if host.find('amqp://') != -1:
                protocol = 'amqp'
                host = host.replace('amqp://', '')
            if host.find('amqps://') != -1:
                protocol = 'amqps'
                host = host.replace('amqps://', '')

            if not protocol:
                url_string = "amqp://" + username + ":" + password + \
                    "@" + host + "/"
            else:
                url_string = protocol + "://" + username + ":" + password + \
                    "@" + host + "/"

            url_parameter = pika.URLParameters(url_string)
            self.connection = pika.BlockingConnection(url_parameter)
            self.readChannel = self.connection.channel()
            self.publishChannel = self.connection.channel()

    def ReceiveMessages(self) -> list[dict]:
        """ Receives messages from the RabbitMQ queue.
        """

        # Check if connection to RabbitMQ is open, if not, reconnect
        if not self.connection.is_open:
            print("Connection to RabbitMQ is not open")
            self.Connect()

        # Check if readChannel is closed, if yes, reinitialize
        if self.readChannel.is_closed:
            print("Channel to RabbitMQ is closed")
            self.readChannel = self.connection.channel()

        # Fetch a message from the queue
        method_frame, header_frame, body = self.readChannel.basic_get(
            self.queueName, auto_ack=True)
        
        # If no message available, sleep and return empty list
        if body is None:
            time.sleep(3.0)
            return []

        # Otherwise, return the received message
        return [json.loads(body)]

    def SendMessage(self, queue: str, message: str):
        """ Sends a message to the RabbitMQ queue.
        
        Parameters:
        -----------
        queue : str
            The name of the queue to send the message to.
        message : str
            The message to send.
        """

        try:
            # Publish the message to the RabbitMQ exchange
            self.publishChannel.basic_publish(
                exchange=self.exchange, routing_key=queue, body=message)
        
        # Handle connection and channel closure exceptions
        except pika.exceptions.ConnectionClosed:
            print('Reconnecting to queue')
            self.Connect()
            self.publishChannel.basic_publish(
                exchange=self.exchange, routing_key=queue, body=message)
        except pika.exceptions.ChannelClosed:
            print('Reconnecting to queue')
            self.publishChannel = self.connection.channel()
            self.publishChannel.basic_publish(
                exchange=self.exchange, routing_key=queue, body=message)

    def Close(self) -> bool:
        """ Closes the connection to RabbitMQ.
        """

        # Close the connection to RabbitMQ
        self.connection.close()
        
        # Return True to indicate successful closure
        return True
