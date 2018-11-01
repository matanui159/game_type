all:
	make allj -j 2
allj: typescript jekyll

typescript:
	tsc -w
jekyll:
	jekyll serve

.PHONY: all allj typescript jekyll