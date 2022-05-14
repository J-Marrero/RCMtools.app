# requires use of "pyexcel-xlsxr", "pyexcel", "BeautifulSoup4"
from cmath import log
from bs4 import BeautifulSoup
import pyexcel as excel
import zipfile
import os
import urllib.request
import logging

#Procure the current working directory
current_working_dir = os.system("cd")

#Get Page with files on it
web_file_location = "https://www.cms.gov/Medicare/Coverage/CoverageGenInfo/LabNCDsICD10"

#Get the page that contains the links to excel files of NCD Policies. This is also where changes will be detected.
mcar_file = urllib.request.urlopen(web_file_location)
mcar_file_contents = BeautifulSoup(mcar_file,"html.parser")
print(mcar_file_contents)

#Get the class for the list of available downloads.

downloads_class = "field field--name-field-downloads field--type-entity-reference field--label-above"

# Assuming that we have previously retrieved the required file from the NCD webpage we will load it "NCD.xlsx"

# Use MyZip to unzip the retrieved archive
myzip = zipfile.ZipFile(local_file_location,'r')
# this creates a folder in the incorrect place, needs to be in the same directory as the file being run.
myzip.extractall(current_working_dir)
myzip.close()