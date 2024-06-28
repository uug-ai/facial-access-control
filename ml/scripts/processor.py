from utils.QueueProcessor import QueueProcessor
from utils.FacialRecognition import FacialRecognition
from utils.Timeline import Timeline
import cv2
import os

# Define the true values for the cropped short video.
TRUE_VALUES_CROPPED_SHORT = [[{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': 'Cedric', 'score': 0.47}], [{'name': 'Cedric', 'score': 0.47}], [{'name': 'Cedric', 'score': 0.47}], [{'name': 'Cedric', 'score': 0.57}], [{'name': 'Cedric', 'score': 0.67}], [{'name': 'Cedric', 'score': 0.45}], [{'name': 'Cedric', 'score': 0.58}], [{'name': 'Cedric', 'score': 0.68}], [{'name': 'Cedric', 'score': 0.62}], [{'name': 'Cedric', 'score': 0.66}], [{'name': 'Cedric', 'score': 0.62}], [{'name': 'Cedric', 'score': 0.68}], [{'name': 'Cedric', 'score': 0.47}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': 'Luis', 'score': 0.46}], [{'name': 'Luis', 'score': 0.46}], [{'name': 'Luis', 'score': 0.46}], [{'name': 'Luis', 'score': 0.46}], [{'name': 'Luis', 'score': 0.46}], [{'name': 'Luis', 'score': 0.46}], [{'name': 'Luis', 'score': 0.46}], [{'name': 'Luis', 'score': 0.51}], [{'name': 'Luis', 'score': 0.4}], [{'name': 'Luis', 'score': 0.46}], [{'name': 'Luis', 'score': 0.44}], [{'name': 'Luis', 'score': 0.55}], [{'name': 'Luis', 'score': 0.45}], [{'name': 'Luis', 'score': 0.45}], [{'name': 'Luis', 'score': 0.48}], [{'name': 'Luis', 'score': 0.58}], [{'name': 'Luis', 'score': 0.52}], [{'name': 'Luis', 'score': 0.46}], [{'name': 'Luis', 'score': 0.53}], [{'name': 'Luis', 'score': 0.46}], [{'name': 'Luis', 'score': 0.46}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': 'Cedric', 'score': 0.54}], [{'name': 'Cedric', 'score': 0.54}], [{'name': 'Cedric', 'score': 0.54}], [{'name': 'Cedric', 'score': 0.6}], [{'name': 'Cedric', 'score': 0.6}], [{'name': 'Cedric', 'score': 0.68}], [{'name': 'Cedric', 'score': 0.67}], [{'name': 'Cedric', 'score': 0.59}], [{'name': 'Cedric', 'score': 0.5}], [{'name': 'Cedric', 'score': 0.5}], [{'name': 'Cedric', 'score': 0.5}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': 'Jonas', 'score': 0.6}], [{'name': 'Jonas', 'score': 0.6}], [{'name': 'Jonas', 'score': 0.6}], [{'name': 'Jonas', 'score': 0.52}], [{'name': 'Jonas', 'score': 0.6}], [{'name': 'Jonas', 'score': 0.63}], [{'name': 'Jonas', 'score': 0.58}], [{'name': 'Jonas', 'score': 0.58}], [{'name': 'Jonas', 'score': 0.58}], [{'name': 'Jonas', 'score': 0.58}], [{'name': 'Jonas', 'score': 0.41}, {'name': 'Kilian', 'score': 0.41}], [{'name': 'Jonas', 'score': 0.44}, {'name': 'Kilian', 'score': 0.41}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': 'Cedric', 'score': 0.52}], [{'name': 'Cedric', 'score': 0.52}], [{'name': 'Cedric', 'score': 0.57}], [{'name': 'Cedric', 'score': 0.61}], [{'name': 'Cedric', 'score': 0.61}], [{'name': 'Cedric', 'score': 0.67}], [{'name': 'Cedric', 'score': 0.55}], [{'name': 'Cedric', 'score': 0.61}], [{'name': 'Cedric', 'score': 0.64}], [{'name': 'Cedric', 'score': 0.67}], [{'name': 'Cedric', 'score': 0.67}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': 'Luis', 'score': 0.42}], [{'name': 'Luis', 'score': 0.42}], [{'name': 'Luis', 'score': 0.42}], [{'name': 'Luis', 'score': 0.42}], [{'name': 'Luis', 'score': 0.42}], [{'name': 'Luis', 'score': 0.48}], [{'name': 'Luis', 'score': 0.63}], [{'name': 'Luis', 'score': 0.51}], [{'name': 'Luis', 'score': 0.47}], [{'name': 'Luis', 'score': 0.54}], [{'name': 'Luis', 'score': 0.51}], [{'name': 'Luis', 'score': 0.56}], [{'name': 'Luis', 'score': 0.45}], [{'name': 'Luis', 'score': 0.42}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': 'Glenn', 'score': 0.48}], [{'name': 'Glenn', 'score': 0.48}], [{'name': 'Glenn', 'score': 0.5}], [{'name': None, 'score': None}], [{'name': 'Glenn', 'score': 0.55}], [{'name': 'Glenn', 'score': 0.49}], [{'name': 'Glenn', 'score': 0.48}], [{'name': 'Glenn', 'score': 0.5}], [{'name': 'Glenn', 'score': 0.65}], [{'name': 'Glenn', 'score': 0.52}], [{'name': 'Glenn', 'score': 0.52}], [{'name': 'Glenn', 'score': 0.53}], [{'name': 'Glenn', 'score': 0.51}], [{'name': 'Glenn', 'score': 0.51}], [{'name': 'Glenn', 'score': 0.51}], [{'name': 'Glenn', 'score': 0.51}], [{'name': 'Glenn', 'score': 0.51}], [{'name': 'Glenn', 'score': 0.51}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': 'Kilian', 'score': 0.63}], [{'name': 'Kilian', 'score': 0.63}], [{'name': 'Kilian', 'score': 0.63}], [{'name': 'Kilian', 'score': 0.63}], [{'name': 'Kilian', 'score': 0.75}], [{'name': 'Kilian', 'score': 0.71}], [{'name': 'Kilian', 'score': 0.71}], [{'name': 'Kilian', 'score': 0.71}], [{'name': 'Kilian', 'score': 0.63}], [{'name': 'Kilian', 'score': 0.63}], [{'name': 'Kilian', 'score': 0.63}], [{'name': 'Kilian', 'score': 0.63}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': 'Jonas', 'score': 0.71}], [{'name': 'Jonas', 'score': 0.71}], [{'name': 'Jonas', 'score': 0.71}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}], [{'name': None, 'score': None}]]


# Define the global variables.
DEV_ADD_SAMPLES_TO_DB = True
DEV_SAMPLES_FOLDER_PATH = "ml/data/test_images"
DEV_RUN_ON_LOCAL_VIDEO = True
DEV_LOCAL_VIDEO_PATH = "ml/data/face_inference_cropped_short.mp4"
VIDEO_PATH = "data/process_video.mp4"
FACE_RECOGNITION_MODEL = "Facenet512"
EMBEDDING_SIZE = 512
TESTING_FPS = 3
SHOW_TIMELINE = False

SOURCE_QUEUE_NAME = os.getenv("QUEUE_NAME", "")
TARGET_QUEUE_NAME = os.getenv("QUEUE_TARGET", "")
SOURCE_QUEUE_SYSTEM = os.getenv("QUEUE_SYSTEM", "")
STORAGE_URI = os.getenv("VAULT_API_URL", "")
STORAGE_ACCESS_KEY = os.getenv("VAULT_ACCESS_KEY", "")
STORAGE_SECRET_KEY = os.getenv("VAULT_SECRET_KEY", "")



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

# Give me a function called get_stats that calculates the following statistics between 2 lists:
# - True Positives (TP): The number of times the same name is detected in both lists.
# - False Positives (FP): The number of times a name is detected in the second list, but not in the first list.
# - False Negatives (FN): The number of times a name is detected in the first list, but not in the second list.
# - True Negatives (TN): The number of times a name is not detected in both lists.
# - Precision: The ratio of True Positives to the sum of True Positives and False Positives.
# - Recall: The ratio of True Positives to the sum of True Positives and False Negatives.
# - F1 Score: The harmonic mean of Precision and Recall.

def get_stats(predicted, actual):
    """ Get the statistics between two lists.
    """

    # Get all unique names
    names = set(name['name'] for sublist in actual for name in sublist)

    # Initialize counters
    results = {}

    for name in names:
        tp = sum(pred[0]['name'] == act[0]['name'] == name for pred, act in zip(predicted, actual))
        fp = sum(pred[0]['name'] == name and act[0]['name'] != name for pred, act in zip(predicted, actual))
        tn = sum(pred[0]['name'] != name and act[0]['name'] != name for pred, act in zip(predicted, actual))
        fn = sum(pred[0]['name'] != name and act[0]['name'] == name for pred, act in zip(predicted, actual))

        print(name)
        print("True positives: ", tp)
        print("False positives: ", fp)
        print("True negatives: ", tn)
        print("False negatives: ", fn)

        accuracy = (tp + tn) / (tp + tn + fp + fn)
        precision = tp / (tp + fp)
        recall = tp / (tp + fn)
        f1_score = 2 * (precision * recall) / (precision + recall)

        print("Accuracy: ", round(accuracy, 2))
        print("Precision: ", round(precision, 2))
        print("Recall: ", round(recall, 2))
        print("F1 Score: ", round(f1_score, 2))
        print()


        

def process_frame(cap, video_char, frame_count, timeline, show_frame=False, verbose=False):
    """ Process the frame from the video-capture.
    """

    # Read the frame from the video-capture.
    success, frame = cap.read()

    # Check if the frame is read successfully and if the frame_count is a multiple of the frame_skip_factor.
    if frame_count % video_char["frame_skip_factor"] == 0 and success:

        # Set the detection to False.
        detection = False
        # Create an empty list to store the detected names in the frame.
        detections_frame = []
        
        # Get the embeddings of the detected faces in the frame.
        represent_data=fr.get_represent(frame, enforce_detection=False)

        # Loop through the detected faces and check if the face is detected with a confidence of 0.9 or more.
        for idx, detected_face in enumerate(represent_data):
            if represent_data[idx]["face_confidence"] > 0.9:

                # Search for the detected face in the database.
                hit = fr.embedding_search(input_embedding = detected_face["embedding"])

                # Check if the detected face is found in the database with a score higher than the threshold.
                if hit.score >= 0.5:
                    
                    # Set the return_bool to True.
                    detection = True

                    # Get the name and score of the detected face.
                    name = hit.payload["img_path"].split("/")[-1].split(".")[0]
                    score = round(hit.score, 2)

                    # check if Jonas is in the name
                    if "Jonas" in name:
                        name = "Jonas"

                    # check if Kilian is in the name
                    elif "Kilian" in name:
                        name = "Kilian"

                    # check if Luis is in the name
                    elif "Luis" in name: 
                        name = "Luis"

                    # check if Cedric is in the name
                    elif "Cedric" in name:
                        name = "Cedric"

                    # check if Glenn is in the name
                    elif "Glenn" in name:
                        name = "Glenn"

                    detections_frame.append({"name": name, "score": score})

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
                        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 0, 255), 2)

                        # Put the name and score on the screen
                        cv2.putText(frame, name, (x, y-40), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)
                        cv2.putText(frame, str(score), (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)

        if SHOW_TIMELINE:
            timeline.update_timeline(detection)
                        
        if show_frame:
            # Display the resulting frame
            cv2.imshow('Image with bounding box', frame)
            #cv2.waitKey(1)
            
            # wait for 'q' key to exit
            if cv2.waitKey(0) & 0xFF == ord('q'):
                cv2.destroyAllWindows()
            
        
        if detections_frame == []:
            detections_frame = [{"name": None, "score": None}]

        # Return the detections_frame if there are detections.
        return detections_frame
    
    # If the frame is not needed to be read, return None.
    return None




def process_video():
    # Open the video-capture/recording.
    cap = open_capture(VIDEO_PATH)
    # Get the characteristics of the video-capture/recording.
    video_char = get_video_characteristics(cap)

    timeline = Timeline(video_char) if SHOW_TIMELINE else None

    # Process the frames from the video-capture/recording.
    print("Processing frames from the video-capture/recording...")
    frame_count = 0
    detection_data = []
    while frame_count < video_char["total_frames"]:
        # Process the frame, looking for faces.
        detections_frame = process_frame(cap, video_char, frame_count, timeline, show_frame=True, verbose=False)
        if detections_frame is not None:
            detection_data.append(detections_frame)
        frame_count += 1

    get_stats(detection_data, TRUE_VALUES_CROPPED_SHORT)

    cap.release()
    cv2.destroyAllWindows()

    


# Initialise the FacialRecognition class.
fr = initialise_facialrecognition(collection_name="people", db_path=":memory:", model_name= FACE_RECOGNITION_MODEL, embedding_size=EMBEDDING_SIZE, dist_metric="cosine", verbose=True)

# Check if the video-capture/recording is to be run on a local video.
VIDEO_PATH = DEV_LOCAL_VIDEO_PATH if DEV_RUN_ON_LOCAL_VIDEO else VIDEO_PATH

if DEV_RUN_ON_LOCAL_VIDEO:
    process_video()

else:
    # Initialise the QueueProcessor class.
    qp = QueueProcessor(SOURCE_QUEUE_NAME, TARGET_QUEUE_NAME, SOURCE_QUEUE_SYSTEM, STORAGE_URI, STORAGE_ACCESS_KEY, STORAGE_SECRET_KEY)

    while True:
        # Process the messages received from the source queue.
        resp = qp.process_messages()
        obj_data = resp.content

        # Filter on tasks to be done based on the received data.
        if ...: # task key is inference

            # From the received requested data, reconstruct a video-file.
            # This creates a video-file in the data folder, containing the recording.
            with open(VIDEO_PATH, 'wb') as output:
                output.write(obj_data)
    
            process_video()
        
        if ...: # Task key is adding embedding
            data = ... # Get the data from the received message.

            # Add the embedding(s) to the database.
            fr.batch_add_embeddings(data = data)
        



