from qdrant_client import models, QdrantClient
from deepface import DeepFace
import traceback

class FacialRecognition:
    """ Class to handle facial recognition tasks.
    """

    def __init__(self, collection_name: str = "people", db_path: str = ":memory:", model_name: str = "VGG-Face", detector: str = "opencv", embedding_size: int = 4096, dist_metric: str = "euclidean", verbose: bool = True):
        """ Initialise the FacialRecognition class.
        """

        self.collection_name = collection_name
        self.db_path = db_path 
        self.embedding_size = embedding_size
        self.model_name = model_name
        self.detector = detector
        self.dist_metric = dist_metric
        

        if verbose:
            print(f"Initialising FacialRecognition class with: \
                    \n\t collection_name: {collection_name} \
                    \n\t db_path: {db_path} \
                    \n\t model_name: {model_name} \
                    \n\t detector: {detector} \
                    \n\t embedding_size: {embedding_size} \
                    \n\t dist_metric: {dist_metric}")

        # Initialise QdrantClient
        try:
            qdrant = QdrantClient(self.db_path)
            if verbose:
                print("Initialised QdrantClient successfully")
        # Handle exceptions
        except Exception as e:
            traceback.print_exc()
            print("Failure initialising QdrantClient:", e)
            pass
        
        # Set distance metric
        self.distance = models.Distance.COSINE if self.dist_metric == "cosine" else models.Distance.EUCLID

        # Create collection 
        try:
            qdrant.recreate_collection(
                collection_name=self.collection_name,
                vectors_config=models.VectorParams(
                    size=self.embedding_size,               # Vector size is defined by used model
                    distance=self.distance
                )
            )
            if verbose:
                print("Created Qdrant collection successfully")
        # Handle exceptions   
        except Exception as e:
            traceback.print_exc()
            print("Failure creating collection:", e)
            pass
        
        # Database object
        self.qdrant = qdrant
    


    def get_represent(self, image, enforce_detection = True):
        """ Get the embedding of the image using DeepFace library
        """

        # Get the embedding of the image using DeepFace library
        return DeepFace.represent(image, enforce_detection=enforce_detection, model_name=self.model_name, detector_backend=self.detector)



    def batch_add_embeddings(self, data: list[dict]):
        """ Add embeddings to the collection in batches.
        """

        try:
            self.qdrant.upload_records(
                collection_name=self.collection_name,
                records=[
                    models.Record(
                        id=doc["id"],
                        vector=self.get_represent(doc["img_path"], enforce_detection=True)[0]["embedding"],
                        payload=doc
                    ) for doc in data
                ]
            )
            return True
        # Handle exceptions
        except Exception as e:
            traceback.print_exc()
            print("Failure adding embeddings:", e)
            return False
            


    def embedding_search(self, input_embedding):
        """ Search for the input_embedding in the collection.
        """
        
        hit = self.qdrant.search(
            collection_name=self.collection_name,
            query_vector=input_embedding,
            limit=1
        )
        
        # Return the hit
        return hit[0]
