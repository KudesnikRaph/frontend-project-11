import 'bootstrap';
import * as yup from 'yup';
import i18next from 'i18next';
// import axios from 'axios';
import _ from 'lodash';

import viewStates from './view.js';
import resources from './locales/index.js';
import locale from './locales/locale.js';
  // const elements = {
  //   form: document.querySelector('.rss-form'),
  //   urlInput: document.querySelector('.rss-form input'),
  //   btn: document.querySelector('.rss-form button'),
  //   feedback: document.querySelector('.feedback'),
  //   feeds: document.querySelector('.feeds'),
  // };
  export default () => {
    const elements = {
      form: document.querySelector('.rss-form'),
      input: document.querySelector('.rss-form input'),
      feedback: document.querySelector('.feedback'),
    };
  
    const initState = {
      feeds: [],
      posts: [],
      form: {
        error: null,
        valid: false,
        status: 'filling',
      },
    };
  
    const i18nextInstance = i18next.createInstance();
  
    const promise = i18nextInstance.init({
      lng: 'ru',
      resources,
    })
      .then(() => {
        yup.setLocale(locale);
        const validateUrl = (url, feeds) => {
          const feedUrl = feeds.map((feed) => feed.url);
          const schema = yup.string().url().required().notOneOf(feedUrl);
  
          return schema.validate(url)
            .then(() => null)
            .catch((error) => error.message);
        };
  
        const watchedState = viewStates(initState, elements, i18nextInstance);
  
        elements.form.addEventListener('submit', (event) => {
          event.preventDefault();
          const data = new FormData(event.target);
          const url = data.get('url');
  
          validateUrl(url, watchedState.feeds)
            .then((error) => {
              if (!error) {
                watchedState.form = {
                  ...watchedState.form,
                  error: null,
                  valid: true,
                };
              } else {
                watchedState.form = {
                  ...watchedState.form,
                  error: error.key,
                  valid: false,
                };
              }
            });
        });
      });
  
    return promise;
  };