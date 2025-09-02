#!/bin/bash
docker run --name $1-container-$3 --ipc=host $1-image-$3:ver-1 sh -c "$2"