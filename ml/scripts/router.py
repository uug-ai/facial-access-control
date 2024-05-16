from utils.QueueProcessor import QueueProcessor
import os

source_queue_name = os.getenv("QUEUE_NAME", "")
target_queue_name = os.getenv("QUEUE_TARGET", "")
source_queue_system = os.getenv("QUEUE_SYSTEM", "")
storage_uri = os.getenv("VAULT_API_URL", "")
storage_access_key = os.getenv("VAULT_ACCESS_KEY", "")
storage_secret = os.getenv("VAULT_SECRET_KEY", "")

qp = QueueProcessor(source_queue_name, target_queue_name, source_queue_system, storage_uri, storage_access_key, storage_secret)
while True:
    resp = qp.process_messages()

    # process resp.content
    ...

    # append to queue
    ...
