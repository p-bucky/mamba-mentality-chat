#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <home|office>"
    exit 1
fi

location=$1

if [ "$location" == "home" ]; then
    ssh-add ~/.ssh/id_rsa_p_bucky
    git config --global user.email "prashanttechjha@gmail.com"
    git config --global user.username "p-bucky"

    git config --global user.email
    git config --global user.username
    echo "Logged in for home."
elif [ "$location" == "office" ]; then
    ssh-add ~/.ssh/id_rsa
    git config --global user.email "prashant.jha@junio.in"
    git config --global user.username "prashant-junio"
    
    git config --global user.email
    git config --global user.username
    echo "Logged in for office."
else
    echo "Invalid location. Please use 'home' or 'office'."
    exit 1
fi
