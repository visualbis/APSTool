#!/bin/bash
cd PowerBI
git reset --hard upstream/master
git push origin aps-tool --force
cd VBI_DX_Suite
git reset --hard upstream/master
git push origin aps-tool --force
