# requires use of "pyexcel-xlsxr", "pyexcel", "BeautifulSoup4"
from bs4 import BeautifulSoup
import BeautifulSoup as soup
import pyexcel as excel
import zipfile
import os
import urllib.request

# procure the current working directory
current_working_dir = os.system("cd")

#get Page with files on it
web_file_location = "https://www.cms.gov/Medicare/Coverage/CoverageGenInfo/LabNCDsICD10"
os.system("wget "+web_file_location)

#get the page that contains the links to excel files of NCD Policies. This is also where changes will be detected.
mcar_file = urllib.request.urlopen(web_file_location)

# Assuming that we have previously retrieved the required file from the NCD webpage we will load it "NCD.xlsx"

# Use MyZip to unzip the retrieved archive
#myzip = zipfile.ZipFile(local_file_location,'r')
# this creates a folder in the incorrect place, needs to be in the same directory as the file being run.
#myzip.extractall(current_working_dir)
#myzip.close()


#sheets = ()

#sheet = p.get_sheet(file_name="Temporary Unzipped File\2022200-Initial-ICD10-NCD-Spreadsheet-20211129.xlsx")