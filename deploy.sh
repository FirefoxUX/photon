#!/bin/bash
set -e # exit with nonzero exit code if anything fails

# clear the dist directory
rm -rf dist || exit 0;

# get the existing gh-pages history, but clean out the files.
if [ "${TRAVIS_BRANCH}" == "staging" ]; then
  GIT_URL="https://jsimplicio:${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}-staging.git"
else
  GIT_URL="https://jsimplicio:${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git"
fi
git clone --quiet --branch=gh-pages ${GIT_URL} dist > /dev/null
cd dist
rm -rf *
cd ..

cd jekyll
bundle exec jekyll build
cd ..

cp -r jekyll/_site/* dist

# inside the gh-pages repo we'll pretend to be a new user
cd dist
git config user.name "Travis CI"
git config user.email "firefox-ux-team@mozilla.com"

if [ -n "$(git status --porcelain)" -a "${TRAVIS_PULL_REQUEST}" == "false" ]; then
  git add -Af .
  git commit -m "Deploy ${TRAVIS_COMMIT_RANGE} to GitHub Pages."

  # Force push from the current repo's master branch to the remote
  # repo's gh-pages branch. (All previous history on the gh-pages branch
  # will be lost, since we are overwriting it.) We redirect any output to
  # /dev/null to hide any sensitive credential data that might otherwise be exposed.
  git push --force --quiet "${GIT_URL}" gh-pages
fi
