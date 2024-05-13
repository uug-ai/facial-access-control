# Face Recognition and Embedding's Database 
This repository contains the back-end ML component of the larger project — the integration of face recognition technology together with a robust vector database.

Within this repository, we present:

* **DeepFace**: representing a breakthrough in face recognition technology. Leveraging deep learning techniques, DeepFace extracts rich, high-dimensional features from facial images, enabling precise identification and verification tasks.
* **Qdrant**: standing out as a robust vector database optimized for similarity search and clustering tasks. Designed to handle large-scale datasets efficiently, Qdrant employs state-of-the-art approximate nearest neighbor algorithms to rapidly retrieve similar vectors.
* **HTTP POST, RabbitMQ and Kerberos Vault integration**: ...
* **MQTT Response**: ...

## DeepFace
Deepface is a lightweight face recognition and facial attribute analysis (age, gender, emotion and race) framework for python. It is a hybrid face recognition framework wrapping state-of-the-art models: VGG-Face, FaceNet, OpenFace, DeepFace, DeepID, ArcFace, Dlib, SFace and GhostFaceNet. More information can be found on [DeepFace's Github](https://github.com/serengil/deepface)

## Qdrant
Qdrant is an enterprise-ready, high-performance, massive-scale Vector Database available as open-source, cloud, and managed on-premise solution. More information can be found on [Qdrant's Github](https://github.com/qdrant/qdrant-client)

### Qdrant and DeepFace Colab ipynb
Both technologies were combined for the implementation for our FAC application, [An example Python Notebook can be found here](https://colab.research.google.com/drive/1G46dqVhfDLoH6xdwmOhY9CetxRlYOrS8?usp=sharing)
