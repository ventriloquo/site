all:
	./blog.sh create
	rm content/1970-01-01-deleteme.md
	./blog.sh build
	printf "gitdir: ../.git/modules/public" > public/.git
