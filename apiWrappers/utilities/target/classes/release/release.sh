#!/bin/bash
#this file is called from the yml file in the root of this project

set -e

#add maven settings to container
cp src/main/resources/release/settings.xml ~/.m2/
 
#add git settings to container
git config --global user.email 'rqi@investquest.pt'
git config --global user.name 'builder'
git config --global push.default simple
git checkout $CI_BUILD_REF_NAME
pushUrl=`git config --get remote.origin.url`
newPushUrl="http://builder:investquest#@"${pushUrl#*@}
git remote set-url origin $newPushUrl

#functions
function advance_version () {
    local v=$1
    # Get the last number. First remove any suffixes (such as '-SNAPSHOT').
    local cleaned=`echo $v | sed -e 's/[^0-9][^0-9]*$//'`
    local last_num=`echo $cleaned | sed -e 's/[0-9]*\.//g'`
    local next_num=$(($last_num+1))
    # Finally replace the last number in version string with the new one.
    echo $v | sed -e "s/[0-9][0-9]*\([^0-9]*\)$/$next_num/"
}

#check if it was iq release script to make the commit. If so, don't make another release. If not, make the release.
commitMessage=`git show $CI_BUILD_REF --quiet --pretty=format:%B`
mvnReleaseMessage="[iq-release-script]"

if [[ ! "$commitMessage" =~ "$mvnReleaseMessage" || "$CI_BUILD_TRIGGERED" == "true" ]]; then
    echo "$mvnReleaseMessage is not in $commitMessage or CI_BUILD_TRIGGERED is $CI_BUILD_TRIGGERED"
	version=`echo -e 'setns x=http://maven.apache.org/POM/4.0.0\ncat /x:project/x:version/text()' | xmllint --shell pom.xml | grep -v /`
	artifactId=`echo -e 'setns x=http://maven.apache.org/POM/4.0.0\ncat /x:project/x:artifactId/text()' | xmllint --shell pom.xml | grep -v /`
	version_release=${version%-SNAPSHOT}
	version_snapshot=$(advance_version $version)"-SNAPSHOT"

	mvn clean compile install
	
	sed -i "0,/$version/s//$version_release/" pom.xml
	git commit -am $mvnReleaseMessage" update pom to release version"
	git tag "$artifactId-$version_release"

	mvn deploy

	sed -i "0,/$version_release/s//$version_snapshot/" pom.xml
	git commit -am $mvnReleaseMessage" update pom snapshot version"
	git push origin --tags
	git push
else
	echo "$mvnReleaseMessage is in $commitMessage"
fi