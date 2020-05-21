import nltk, re, string, collections
from nltk.util import ngrams
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import pandas as pd

data = pd.read_csv("./2019_10_05.csv")
