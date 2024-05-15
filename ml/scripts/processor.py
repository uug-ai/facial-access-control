from utils.QueueProcessor import QueueProcessor
from utils.FacialRecognition import FacialRecognition
from utils.Timeline import Timeline
import matplotlib.pyplot as plt
import cv2
import os



# Define the global variables.
DEV_ADD_SAMPLES_TO_DB = True
DEV_SAMPLES_FOLDER_PATH = "ml/data/test_images"
DEV_RUN_ON_LOCAL_VIDEO = True
DEV_LOCAL_VIDEO_PATH = "ml/data/face_inference.mp4"
FACE_RECOGNITION_MODEL = "Facenet"
TESTING_FPS = 3
SHOW_TIMELINE = True



def initialise_facialrecognition(collection_name, db_path, model_name, embedding_size, dist_metric, verbose):
    """ Initialise the FacialRecognition class.
    """

    fr = FacialRecognition(collection_name = collection_name, db_path = db_path, model_name=model_name, embedding_size = embedding_size, dist_metric = dist_metric, verbose = verbose)

    # Add the samples to the database for development purposes.
    if DEV_ADD_SAMPLES_TO_DB:
        batch_list = []
        for idx, filename in enumerate(os.listdir(DEV_SAMPLES_FOLDER_PATH)):
            image_path = os.path.join(DEV_SAMPLES_FOLDER_PATH, filename)
            batch_list.append({"id": idx, "img_path": image_path})
        fr.batch_add_embeddings(data = batch_list)
    
    # Return the initialised FacialRecognition class.
    return fr



def open_capture(video_path):
    """ Open the video-capture/recording using the video-path.
    """

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
    """ Get the characteristics of the video-capture/recording.
    """

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



def process_frame(verbose=True, show_frame=False):
    """ Process the frame from the video-capture.
    """

    detection = False

    # Read the frame from the video-capture.
    success, frame = cap.read()

    # Check if the frame is read successfully and if the frame_count is a multiple of the frame_skip_factor.
    if frame_count % video_char["frame_skip_factor"] == 0 and success:
        
        # Get the embeddings of the detected faces in the frame.
        represent_data=fr.get_represent(frame, enforce_detection=False)

        # Loop through the detected faces and check if the face is detected with a confidence of 0.9 or more.
        for idx, detected_face in enumerate(represent_data):
            if represent_data[idx]["face_confidence"] > 0.9:

                # Search for the detected face in the database.
                hit = fr.embedding_search(input_embedding = detected_face["embedding"])

                # Check if the detected face is found in the database with a score higher than the threshold.
                if hit.score >= 0.4:
                    
                    # Set the return_bool to True.
                    detection = True

                    # Get the name and score of the detected face.
                    name = hit.payload["img_path"].split("/")[-1].split(".")[0]
                    score = round(hit.score, 2)

                    # Print the name and score of the detected face.
                    if verbose:
                        print(name, "detected with a score of:", score)
                    
                    # Draw the bounding box around the detected face.
                    if show_frame:
                        # Get the coordinates of the lower left corner
                        x = represent_data[idx]["facial_area"]["x"]
                        y = represent_data[idx]["facial_area"]["y"]

                        # Get the width and height of the rectangle
                        w = represent_data[idx]["facial_area"]["w"]
                        h = represent_data[idx]["facial_area"]["h"]

                        # Draw rectangle on the frame
                        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

                        # Put the name and score on the screen
                        cv2.putText(frame, name, (x, y-40), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36,255,12), 2)
                        cv2.putText(frame, str(score), (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36,255,12), 2)

        if SHOW_TIMELINE:
            timeline.update_timeline(detection)
                        
        if show_frame:
            # Display the resulting frame
            cv2.imshow('Image with bounding box', frame)
            cv2.waitKey(1)

    return detection

        
    


# Initialise the FacialRecognition class.
fr = initialise_facialrecognition(collection_name="people", db_path=":memory:", model_name= "Facenet", embedding_size=128, dist_metric="cosine", verbose=True)

# Open the video-capture/recording.
cap = open_capture(DEV_LOCAL_VIDEO_PATH)
# Get the characteristics of the video-capture/recording.
video_char = get_video_characteristics(cap)

detections = []

if SHOW_TIMELINE:
    timeline = Timeline(video_char)

# Process the frames from the video-capture/recording.
print("Processing frames from the video-capture/recording...")
while frame_count < video_char["total_frames"]:
    # Process the frame, looking for faces.
    detected_bool = process_frame(verbose=False, show_frame=True)
    detections.append(detected_bool)
    frame_count += 1

cap.release()
cv2.destroyAllWindows()
