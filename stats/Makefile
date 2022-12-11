.PHONY: help docker-build docker-tag docker-push-latest

DOCKER_IMAGE_NAME = asia-docker.pkg.dev/hallowed-scene-371307/asia.gcr.io/stats-run:latest

help: ## show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {sub("\\\\n",sprintf("\n%22c"," "), $$2);printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

docker-build:
	docker build \
		-f Dockerfile \
		-t stats-run .

docker-tag:
	docker tag \
		stats-run:latest \
		${DOCKER_IMAGE_NAME}
		

docker-push-latest: docker-build docker-tag
	docker push ${DOCKER_IMAGE_NAME}

