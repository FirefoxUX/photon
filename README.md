# Photon Design System

Requires:
* docker

To run (with hot-reloading!):
* First, check out this repository into a folder.
* Go to your command line, enter that folder, and run the following commands:
```
docker pull praqma/gh-pages
docker run --name photon -d -v $PWD/jekyll:/home/jenkins -p 4000:4000 praqma/gh-pages || docker start photon
docker exec -it photon jekyll serve --watch --host=0.0.0.0
```
* Open up http://localhost:4000/photon/

Once you have something you like, it's time to share it with the rest of us!

To get your changes merged:
* Make sure you're working on `master`, and submit the pull request to there.
* Make your pull request as small as possible (so it's easier to review and merge them).
* If it's something that needs to be merged as soon as possible, add a tag (e.g. urgent).
