from qdrant_client import models, QdrantClient
from deepface import DeepFace
import traceback

class FacialRecognition:
    def __init__(collection_name: str, db_path: str = ":memory:", embedding_size: int = 4096, dist_metric: str = "euclidean", verbose: bool = True) -> QdrantClient:
        try:
            qdrant = QdrantClient(db_path)
            if verbose:
                print("Initialised QdrantClient with path:", db_path)
        except Exception as e:
            traceback.print_exc()
            print("Failure initialising QdrantClient:", e)
            pass
        
        distance = models.Distance.COSINE if dist_metric == "cosine" else models.Distance.EUCLID
        if verbose:
            print("Using distance metric: ", distance)

        try:
            # Create collection to store faces
            qdrant.recreate_collection(
                collection_name=collection_name,
                vectors_config=models.VectorParams(
                    size=embedding_size, # Vector size is defined by used model
                    distance=distance
                )
            )
            if verbose:
                print("successfully created Qdrant collection")
            
        except Exception as e:
            traceback.print_exc()
            print("Failure creating collection:", e)
            pass

        return qdrant

    def batch_add_embeddings(qdrant: QdrantClient, collection_name: str, data: list[dict]):
        try:
            qdrant.upload_records(
                collection_name=collection_name,
                records=[
                    models.Record(
                        id=data["id"],
                        # Embedding of the image
                        vector=DeepFace.represent(img_path = doc["img_path"])[0]["embedding"],
                        payload=doc
                    ) for doc in data
                ]
            )
            return True
        
        except Exception as e:
            traceback.print_exc()
            print("Failure adding embeddings:", e)
            

    def embedding_search(qdrant: QdrantClient, collection_name: str, input_embedding, verbose: bool = True):
        hits = qdrant.search(
            collection_name="people",
            query_vector=input,
            query_filter=models.Filter(
                must=[
                    models.FieldCondition(
                        key="extra_filter",
                        range=models.Range(
                            gte=2 # greater than or equal
                        )
                    )
                ]
            ),
            limit=1
        )

        if verbose:
            for hit in hits:
                print(hit.payload, "score:", hit.score)
        
        return hits