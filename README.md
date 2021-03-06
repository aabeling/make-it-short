# Motivation

You probably know this situation: you sit in a meeting, discussing some points
and someone just does not come to an end and the moderator
is not able (or too polite) to interrupt.     
Now this extension comes to help by showing a timer
for the speaking time.    
After the timer has been started the remaining time
is shown on the toolbar button.    
A running timer is indicated by a green border around
the whole page.    
The border turns orange at the end of the speaking time and red when speaking time is over.    
The start and warn time can be configured.

# Open issues

* the timer runs for the active tab. If the tab is changed the previous tab will not be updated.

# Development

(just a reminder for myself)

* develop on branch main
* increase the version number in manifest.json
* merge to release with
```
git checkout release
git merge --no-ff main
git push
```
* tag and push the release with the same version number from manifest.json
```
git tag -a -m "v0.0.X" v0.0.X
git push --tags
```