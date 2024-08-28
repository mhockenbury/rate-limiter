# A simple rate limiter example

Project to build examples of rate limiting implementations; inspired by Alex Xu's book "System Design Interview: An Insiders Guide" Chapter 4. 

Currently implements a Token Bucket based rate limiting algorithim, with more to come.

## TODO:
- track jest releases for [this patch currently in an alpha release](https://github.com/jestjs/jest/pull/14509) fixing the glob/inflight dependency deprecations notices
- Wire up TokenBucket into express api
- Implement other rate limiting approaches described including:
    - Leaky Bucket
    - Fixed Window Counter
    - Sliding Window Log
    - SLiding Window Counter