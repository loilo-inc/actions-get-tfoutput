main: lib/index.js
lib/index.js: src/index.ts src/s3.ts
	yarn ncc build src/index.ts -o lib
