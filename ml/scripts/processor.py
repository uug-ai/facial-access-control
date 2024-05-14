from utils.QueueProcessor import QueueProcessor
from utils.FacialRecognition import FacialRecognition
from deepface import DeepFace
import cv2
import os

DEV_ADD_SAMPLES_TO_DB = True
DEV_SAMPLES_FOLDER_PATH = "ml/data/test_images"
DEV_RUN_ON_LOCAL_VIDEO = True
DEV_LOCAL_VIDEO_PATH = "ml/data/face_inference.mp4"
FACE_RECOGNITION_MODEL = "Facenet"

TESTING_FPS = 3

def initialise_facialrecognition(collection_name, db_path, embedding_size, dist_metric, verbose):
    
    qdrant = FacialRecognition.__init__(collection_name, db_path, embedding_size, dist_metric, verbose)

    if DEV_ADD_SAMPLES_TO_DB:
        batch_list = []
        for idx, filename in enumerate(os.listdir(DEV_SAMPLES_FOLDER_PATH)):
            image_path = os.path.join(DEV_SAMPLES_FOLDER_PATH, filename)
            batch_list.append({"id": idx, "img_path": image_path})
        FacialRecognition.batch_add_embeddings(qdrant = qdrant, model_name = FACE_RECOGNITION_MODEL, collection_name = "people", data = batch_list)
    
    return qdrant


def open_capture(video_path):
    # Open video-capture/recording using the video-path.
    cap = cv2.VideoCapture(video_path)

    # Define frame_count variable to keep track of the current frame.
    global frame_count
    frame_count = 0

    # Throw FileNotFoundError if cap is unable to open.
    if not cap.isOpened():
        FileNotFoundError('Unable to open video file')
    
    return cap


def get_video_characteristics(cap):
    # Get recording framerate.
    frame_rate = cap.get(cv2.CAP_PROP_FPS)
    frame_skip_factor = round(frame_rate / TESTING_FPS)
    # Get total number of frames.
    total_frames = cap.get(cv2.CAP_PROP_FRAME_COUNT)
    # Calculate duration (in seconds).
    duration_seconds = total_frames / frame_rate
    # Find frame width and height, used for counting feature later-on in the pipeline.
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    

    return {"frame_rate": frame_rate, "frame_skip_factor": frame_skip_factor, "total_frames": total_frames, "duration_seconds": duration_seconds, "frame_width":frame_width, "frame_height": frame_height}


def process_frame(cap, video_char, qdrant, verbose=True, show_frame=False):
    
    success, frame = cap.read()

    if frame_count % video_char["frame_skip_factor"] == 0:

        if success:
            represent_data=FacialRecognition.get_represent(frame, model_name = FACE_RECOGNITION_MODEL, enforce_detection=False)

            for idx, detected_face in enumerate(represent_data):
                if represent_data[idx]["face_confidence"] > 0.9:
                    hit = FacialRecognition.embedding_search(qdrant = qdrant, collection_name = "people", input_embedding = detected_face["embedding"], score_threshold=0.35, verbose = verbose)[0]
                    if hit.score >= 0.4:
                        name = hit.payload["img_path"].split("/")[-1].split(".")[0]
                        score = round(hit.score, 2)
                        print(name, "detected with a score of:", score)

                        if show_frame:
                            # Get the coordinates of the lower left corner
                            x = represent_data[idx]["facial_area"]["x"]
                            y = represent_data[idx]["facial_area"]["y"]

                            # Get the width and height of the rectangle
                            w = represent_data[idx]["facial_area"]["w"]
                            h = represent_data[idx]["facial_area"]["h"]

                            # Draw rectangle on the frame
                            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

                            # Get the name from the image path
                            name = hit.payload["img_path"].split("/")[-1].split(".")[0]

                            # Put the name on the screen
                            cv2.putText(frame, name, (x, y-40), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36,255,12), 2)
                            cv2.putText(frame, str(score), (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36,255,12), 2)



                if show_frame:
                    # Display the resulting frame
                    cv2.imshow('Image with bounding box', frame)
                    cv2.waitKey(1)
    

db = initialise_facialrecognition(collection_name="people", db_path=":memory:", embedding_size=128, dist_metric="cosine", verbose=True)
cap = open_capture(DEV_LOCAL_VIDEO_PATH)
video_char = get_video_characteristics(cap)
while frame_count < video_char["total_frames"]:
    hits = process_frame(cap, video_char, db, verbose=False, show_frame=True)
    frame_count += 1

cap.release()
cv2.destroyAllWindows()
