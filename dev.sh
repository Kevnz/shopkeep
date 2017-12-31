# stop all containers and remove them
docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
# remove images for shopkeep
docker rmi $(docker images | grep -i "shopkeep" |  awk '{ print $3 }')
# build up containers
docker-compose -f docker-compose-dev.yml up --build
