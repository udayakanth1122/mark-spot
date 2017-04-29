#!/bin/bash

ionic platform remove ios
ionic platform add ios
ionic build ios
chmod -R 777 .
