---
published: false
---
## Some ideas on a server for CEA

- database (mysql could do just fine or even sqlite3?)
  - update InputLocator to get()/put() DataFrames
  - use schemas.yml
- cea-server
  - must be reachable from cea-worker
  - supervises jobs
  - workflows (yaml?)
  - api for locator calls
  - manages projects / scenarios
  - can we combine this with the dashboard somehow? should we?
    - users and stuff would go here
  - knows how to `bsub cea-worker` on Euler if given ssh data? where to store ssh data? seems a little... insecure to me.
- cea-worker
  - checks in with cea-server
  - runs jobs and posts back results
  - does the euler version start new jobs? or does only the cea-server start those? how many?
  - could this be a docker thing?
  - data to work on needs to be downloaded from cea-server/db-api
    - but since we abstract away the paths... this isn't much of a problem anymore...
  - 
  
