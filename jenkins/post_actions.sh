#!/bin/bash
if docker cp $1-container-$2:/home/app/playwright-report $PLAYWRIGHT_REPORT; then
    docker run --rm --name playwright-report-container \
    -v $PLAYWRIGHT_REPORT:/home/app/prs -e RUN_KEY=$DOCKER_KEY \
    -e SEND_TO="$SEND_TO" -e MESSAGE="Reporte generado por Playwright" \
    playwright-report:ver-1
else
    echo 'No se ha podido encontrar el reporte de Playwright'
fi

if docker stop $1-container-$2; then
    docker rm $1-container-$2
else
    echo 'No se ha encontrado el contenedor indicado'
fi

if docker rmi $1-image-$2:ver-1; then
    echo 'Imagen borrada correctamente'
else
    echo 'No se ha encontrado la imagen indicada'
fi
