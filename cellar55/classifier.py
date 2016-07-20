# -*- coding: utf-8 -*-

import re

RED_WINE_KEY_WORDS = [
    'red', 'pinot noir', 'cabernet', 'merlot', 'primivito', 'malbec', 'syrah',
    'sangiovese', 'nerello', 'mascalese', 'nebbiolo', 'corvina', 'rondinella',
    'grenache', 'mourvedre', 'cinsault', 'gamay'
]

WHITE_WINE_KEY_WORDS = [
    'white', 'chardonnay', 'chablis', 'riesling', 'gruner', 'veltliner', 'pigato',
    'sauvignon blanc', 'aligot', 'melon de bourgogne', 'assyrtiko'
]

SPARKLING_WINE_KEY_WORDS = [
    'brut', 'champagne', 'sparkling'
]

ROSE_WINE_TYPE = u'ros\xe9'

class WineTypeClassifier:

    def __init__(self, name, lead, description, varietal):
        self.name = u'{0}'.format(name).lower()
        self.text = u'{0} {1}'.format(lead, description, varietal).lower()

    def classify(self):
        if self._is_rose():
            return 'rose'
        elif self._is_sparkling():
            return 'sparkling'
        else:
            red_wine_word_appearance_count = self._get_red_wine_key_words_appearance_count()
            white_wine_word_appearance_count = self._get_white_wine_key_words_appearance_count()
            if (red_wine_word_appearance_count > white_wine_word_appearance_count):
                return 'red'
            else:
                return 'white'

    def _is_rose(self):
        return ROSE_WINE_TYPE in self.name

    def _is_sparkling(self):
        for name_section in self.name.split(' '):
            if name_section in SPARKLING_WINE_KEY_WORDS:
                return True
        return False

    def _get_red_wine_key_words_appearance_count(self):
        return self._get_words_appearance_count(RED_WINE_KEY_WORDS)

    def _get_white_wine_key_words_appearance_count(self):
        return self._get_words_appearance_count(WHITE_WINE_KEY_WORDS)

    def _get_words_appearance_count(self, words):
        search_text = u'{0} {1}'.format(self.name, self.text)
        count = 0
        for word in words:
            count += len(re.findall(r'\W*{0}\W*'.format(word), search_text, re.IGNORECASE))
        return count
