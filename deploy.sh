#!/bin/bash
rm -rf build && \
rm -rf docs && \
npm run build && mv build docs && \
echo -n "celestepitzak.com" > docs/CNAME && \
git add . && git commit -m "deploy" && \
git push origin main;