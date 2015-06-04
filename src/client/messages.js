export default {
  en: {
    app: {
      madeByHtml: `made by <a href="https://twitter.com/steida">steida</a>`
    },
    auth: {
      form: {
        button: {
          login: 'Login',
          signup: 'Sign up'
        },
        hint: 'Hint: pass1',
        legend: 'Login / Sign Up',
        placeholder: {
          email: 'your@email.com',
          password: 'password'
        },
        wrongPassword: 'Wrong password'
      },
      logout: {
        button: 'Logout'
      },
      title: 'Login'
    },
    buttons: {
      cancel: 'Cancel',
      edit: 'Edit',
      save: 'Save'
    },
    confirmations: {
      cancelEdit: `You have unsaved changes. Are you sure you want to cancel them?`
    },
    home: {
      infoHtml: `App starter kit for <a href="https://github.com/steida/este">Este.js</a>. Check`,
      title: 'Este.js App',
      todos: 'todos'
    },
    me: {
      title: 'Me',
      welcome: `Hi {email}. This is your secret page.`
    },
    menu: {
      headerHtml: `<a href="https://github.com/steida/este">Este.js</a> App`,
      home: 'Home',
      login: 'Login',
      me: 'Me (protected)',
      todos: 'Todos'
    },
    notFound: {
      continueMessage: 'Continue here please.',
      header: 'This page isn\'t available',
      message: 'The link may be broken, or the page may have been removed.',
      title: 'Page Not Found'
    },
    toCheck: {
      andMuchMore: '... and much more.',
      header: 'Things to Check',
      isomorphicPage: 'Isomorphic page',
      itemListHtml: [  // List of language dependent length containing translated messages for React components
        {
          key: 'source',
          txt: `View page source, take a look how HTML is server rendered with initial data.`
        },
        {
          key: 'console',
          txt: `Open console, take a look how actions are logged from <code>src/client/dispatcher.js</code>.`
        },
        {
          key: 'development',
          txt: `Development mode (<code>gulp</code>), try edit styles or react component to see
                <a href="https://www.youtube.com/watch?v=pw4fKkyPPg8">live-editing</a> without app reload.`
        },
        {
          key: 'production',
          txt: `Production mode (<code>gulp -p</code>), to check built app performance and size.`
        },
        {
          key: 'undo',
          txt: `Undo button. (temporally disabled)`
        },
        {
          key: 'edit',
          txt: `Edit todo: Click to edit, esc to cancel, enter to save.`
        },
        {
          key: 'globalState',
          txt: `Global immutable app state, have you seen this <a href="https://www.youtube.com/watch?v=5yHFTN-_mOo">
                video</a>? Try <b>ctrl+shift+s</b> to save app state, and <b>ctrl+shift+l</b> to load.`
        },
        {
          key: 'pureComponent',
          txt: `<a href="http://facebook.github.io/react/docs/advanced-performance.html">Advanced performance</a>
                with PureComponent. Always use PureComponent and everything will be faster and simpler.`
        }
      ]
    },
    todos: {
      add100: 'Add 100 Todos',
      clearAll: 'Clear All',
      emptyList: 'Nothing. Go outside and enjoy world.',
      newTodoPlaceholder: 'What needs to be done?',
      title: 'Todos',
      undo: `Undo {steps, plural,
        =0 {}
        other {(#)}
      }`
    },
    validation: {
      email: `Email address is not valid.`,
      password: `Password must contain at least {minLength} characters.`,
      required: `Please fill out {prop, select,
        email {email}
        password {password}
        other {'{prop}'}
      }.`
    }
  }
};
