install: 
	npm install

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

build:
	NODE_ENV=production npx webpack

dev:
	npx webpack serve
