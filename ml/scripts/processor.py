from utils.QueueProcessor import QueueProcessor
from utils.FacialRecognition import FacialRecognition

def write_video_file(obj_data):
    """ Writes video data to a file and returns the file name.
    """

    file_name = './data/video.mp4'
    with open(file_name, 'wb') as output:
        output.write(obj_data)
    return file_name

processor = QueueProcessor()
qdrant = FacialRecognition("people", ":memory:", embedding_size=4096, dist_metric="cosine")
resp = processor.process_messages()
video_file_path = write_video_file(resp.content)