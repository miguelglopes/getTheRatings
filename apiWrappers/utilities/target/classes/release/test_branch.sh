#!/bin/bash
#this file is called from the yml file in the root of this project

set -e

#add maven settings to container
cp src/main/resources/release/settings.xml ~/.m2/

#check if it was iq release script to make the commit. If so, don't make another release. If not, make the release.
commitMessage=`git show $CI_BUILD_REF --quiet --pretty=format:%B`
mvnReleaseMessage="[no-tests]"

if [[ ! "$commitMessage" =~ "$mvnReleaseMessage" || "$CI_BUILD_TRIGGERED" == "true" ]]; then
    mvn clean compile install
else
	echo "$mvnReleaseMessage is in $commitMessage"
fi