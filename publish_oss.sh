#!/bin/bash
yarn build
ossutil64 cp -r dist/ $FOOD_OSS --force