MODULE_VERSION := $(shell git describe --tags --always)

docker-push:
	rm -rf node_modules && rm -rf build && rm -rf yarn.lock
	yarn
	yarn run build
	docker build -t harbor.vht.vn/c4i/fe-template:${MODULE_VERSION} .
	docker push harbor.vht.vn/c4i/fe-template:${MODULE_VERSION}