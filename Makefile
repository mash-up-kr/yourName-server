tag ?= latest

build:
	docker build -t meetu:${tag} .
clean:
	docker rmi -f meetu:${tag}
run:
	docker run -d -p 3000:3000 --name meetu-server meetu:${tag}
