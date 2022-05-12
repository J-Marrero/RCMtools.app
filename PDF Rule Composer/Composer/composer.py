# requires use of "pyexcel-xlsxr", "pyexcel",

import pyexcel as excel
import zipfile
import os

# declare the locations of where the file comes from.

web_file_location = "https://www.cms.gov/Medicare/Coverage/CoverageGenInfo/LabNCDsICD10"
local_file_location = ".\PDF Rule Composer\Composer\april-2022-lab-code-list-icd-10.zip"
current_working_dir = os.system("cd")
# Assuming that we have previously retrieved the required file from the NCD webpage we will load it "NCD.xlsx"

# Use MyZip to unzip the retrieved archive
myzip = zipfile.ZipFile(local_file_location,'r')
# this creates a folder in the incorrect place, needs to be in the same directory as the file being run.
myzip.extractall(current_working_dir)
myzip.close()


sheets = ()

sheet = p.get_sheet(file_name="Temporary Unzipped File\2022200-Initial-ICD10-NCD-Spreadsheet-20211129.xlsx")