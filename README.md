# uuft.ai (facial access control)

This project is a facial access control system that allows you to setup a facial biometric permission application to provide access to various applications, IO devices or other types of access control.
The application is called `uuft` which is Ghent dialect for `head` and relates to the face recognition.

As of now this project is heavily under construction, so expect some brutal changes coming up ;)

## Demo

To be completed

## How does it work?

Uuft is a web based application that allows you to build and administer the biometrics of people within you organisation that requires biometric access through face detection. The application allows you to:
- Create an hierarchy of user accounts
- Collection of biometric data from specific users
- Assign access to various applications (APIs) and or other IoT devices through the concept of plugins
- Create custom landing pages for specific scenarios (entering a meeting room, open postbox, request access to an application, and more).
- ...

Next to the web based application, a machine learning workload is running in the background allowing to retrain or add more faces to the face recognition model on the fly, and more:
- On the fly updating of new biometric data
- Isolation of biometric data on your infrastructure (you own the biometrics, nothing is in the cloud)
- ....

## Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/uug-ai/facial-access-control/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=uug-ai/facial-access-control" />
</a>
