FROM kerberos/base:eb6b088 AS build-api
LABEL AUTHOR=uugai

ENV GOROOT=/usr/local/go
ENV GOPATH=/go
ENV PATH=$GOPATH/bin:$GOROOT/bin:/usr/local/lib:$PATH
ENV GOSUMDB=off

##########################################
# Installing some additional dependencies.

RUN apt-get update && apt-get install -y --no-install-recommends \
    git build-essential cmake pkg-config unzip libgtk2.0-dev \
    curl ca-certificates libcurl4-openssl-dev libssl-dev libjpeg62-turbo-dev && \
    rm -rf /var/lib/apt/lists/*

############################################
# Install Go

RUN mkdir -p /go/src/github.com/uug-ai/facial-access-control/api
COPY . /go/src/github.com/uug-ai/facial-access-control/api

##################
# Build API

RUN cd /go/src/github.com/uug-ai/facial-access-control/api && \
    go mod download && \
    go build -tags timetzdata,netgo --ldflags '-s -w -extldflags "-static -latomic"' main.go && \
    mkdir -p /hub && mv main /hub && \
    rm -rf /go/src/github.com

####################################
# Let's create a /dist folder containing just the files necessary for runtime.
# Later, it will be copied as the / (root) of the output image.

WORKDIR /dist
RUN cp -r /hub ./
RUN /dist/hub/main version

FROM alpine:latest

############################
# Protect by non-root user.

RUN addgroup -S kerberosio && adduser -S hub -G kerberosio && addgroup hub video

#################################
# Copy files from previous images

COPY --chown=0:0 --from=build-api /dist /

############################
# Move directory to /var/lib

RUN apk update && apk add ca-certificates curl libstdc++ libc6-compat --no-cache && rm -rf /var/cache/apk/*

##################
# Try running hub

RUN mv /hub/* /home/hub/
RUN /home/hub/main version

###########################
# Grant the necessary root capabilities to the process trying to bind to the privileged port
RUN apk add libcap && setcap 'cap_net_bind_service=+ep' /home/hub/main

###################
# Run non-root user

USER hub

######################################
# By default the app runs on port 80

EXPOSE 80

######################################
# Check if vault is still running

HEALTHCHECK CMD curl --fail http://localhost:8081 || exit 1   

###################################################
# Leeeeettttt'ssss goooooo!!!
# Run the shizzle from the right working directory.

WORKDIR /home/hub
CMD ["./main", "-action", "run"]

