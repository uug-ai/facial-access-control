from utils.QueueProcessor import QueueProcessor
from utils.FacialRecognition import FacialRecognition
import cv2

DEV_LOCAL_VIDEO = True
VIDEO_PATH = "ml/data/face_inference.mp4"
TESTING_FPS = 3
OPENCV_WRITE_VIDEO = False


def write_video_file(obj_data):
    """ Writes video data to a file and returns the file name.
    """

    file_name = './data/video.mp4'
    with open(file_name, 'wb') as output:
        output.write(obj_data)
    return file_name


if DEV_LOCAL_VIDEO:
    # Open video-capture/recording using the video-path.
    cap = cv2.VideoCapture(VIDEO_PATH)
    # Throw FileNotFoundError if cap is unable to open.
    if not cap.isOpened():
        FileNotFoundError('Unable to open video file')

# Get recording framerate.
frame_rate = cap.get(cv2.CAP_PROP_FPS)
# Get total number of frames.
total_frames = cap.get(cv2.CAP_PROP_FRAME_COUNT)
# Calculate duration (in seconds).
duration_seconds = total_frames / frame_rate
# Find frame width and height, used for counting feature later-on in the pipeline.
frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

if OPENCV_WRITE_VIDEO:
    # Define the codec and create VideoWriter object
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    video_out = cv2.VideoWriter('output/output-video.mp4', fourcc, TESTING_FPS, (frame_width, frame_height))



# frame_count variable is used to alter the frame selection process, this allows for FPS changes.
frame_count = 0
# Calculate the frame skip factor based on the original and desired FPS
frame_skip_factor = round(frame_rate / TESTING_FPS)

# Loop through the video frames.
while frame_count < total_frames:
    
    # Read the frame from the video.
    success, frame = cap.read()

    # Check for successful cap.read().
    if frame_count % frame_skip_factor == 0:

        if success:
            cv2.imshow("YOLOv8 Tracking", frame)
            cv2.waitKey(1)



"""
processor = QueueProcessor()
qdrant = FacialRecognition("people", ":memory:", embedding_size=4096, dist_metric="cosine")
resp = processor.process_messages()
video_file_path = write_video_file(resp.content)
"""