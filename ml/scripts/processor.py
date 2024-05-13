from utils.QueueProcessor import QueueProcessor
from utils.FacialRecognition import FacialRecognition
from deepface import DeepFace
import cv2
import os

DEV_LOCAL_VIDEO = True
VIDEO_PATH = "ml/data/face_inference.mp4"
FOLDER_PATH = ""
TESTING_FPS = 3
OPENCV_WRITE_VIDEO = False

def get_video_characteristics(cap):
    # Get recording framerate.
    frame_rate = cap.get(cv2.CAP_PROP_FPS)
    # Get total number of frames.
    total_frames = cap.get(cv2.CAP_PROP_FRAME_COUNT)
    # Calculate duration (in seconds).
    duration_seconds = total_frames / frame_rate
    # Find frame width and height, used for counting feature later-on in the pipeline.
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    return frame_rate, total_frames, duration_seconds, frame_width, frame_height

if DEV_LOCAL_VIDEO:
    qdrant = FacialRecognition.__init__(collection_name="people", db_path=":memory:", embedding_size=4096, dist_metric="cosine", verbose=True)

    # Iterate over files in the folder
    batch_list = []
    for filename in os.listdir(FOLDER_PATH):
        # Check if the file is an image (you can add more image extensions if needed)
        if filename.endswith(".jpg") or filename.endswith(".png") or filename.endswith(".jpeg"):
            # Construct the full path to the image file
            image_path = os.path.join(FOLDER_PATH, filename)
            
        batch_list.append({"id": filename, "img_path": image_path})
    
    qdrant.batch_add_embeddings("people", batch_list)

    # Open video-capture/recording using the video-path.
    cap = cv2.VideoCapture(VIDEO_PATH)
    # Throw FileNotFoundError if cap is unable to open.
    if not cap.isOpened():
        FileNotFoundError('Unable to open video file')

    frame_rate, total_frames, duration_seconds, frame_width, frame_height = get_video_characteristics(cap)

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
            vector=DeepFace.represent(frame)[0]["embedding"]
            qdrant.embedding_search("people", vector, True)
            cv2.waitKey(1)