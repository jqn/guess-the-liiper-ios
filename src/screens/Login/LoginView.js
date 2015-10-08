/* @flow */
var React = require('react-native');
var Variables = require('../../Variables');
var { StyleSheet, LayoutAnimation, View, Text, Image } = React;
var { FaceGridBackground, ScrollView, Button, Link, LoadingIndicator } = require('../../GuessUI');

var I18n = require('react-native-i18n-complete');

I18n.fallbacks = true;

I18n.translations = {
  en: {
    buttons: {
      play: 'Play now',
      highscore: 'Highscores',
      logout: 'Logout'
    }
  },
  fr: {
    buttons: {
      play: 'Jouer',
      highscore: 'Meilleures scores',
      logout: 'Se déconnecter'
    }
  }
}



var LoginView = React.createClass({

  propTypes: {
    loggedIn: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
    onLoginPressed: React.PropTypes.func.isRequired,
    onHighscorePressed: React.PropTypes.func.isRequired,
    onLogoutPressed: React.PropTypes.func.isRequired,
    onPlayPressed: React.PropTypes.func.isRequired,
  },

  animation: {
    duration: 700,
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 0.4,
    },
  },

  render: function () {
    LayoutAnimation.configureNext(this.animation);

    var component;
    if (this.props.loading) {
      component = <LoadingIndicator />
    } else if (this.props.loggedIn) {
      component = this.renderLoggedInButtons();
    } else {
      component = this.renderLoggedOutButtons();
    }

    return (
      <FaceGridBackground>
        <View style={styles.container}>
          <View style={styles.loginContainer}>
            <Image style={styles.logo} resizeMode="contain" source={{ uri: 'guess_logo', isStatic: true }} />
            <View style={styles.hidden}>{ this.props.children }</View>
            { component }
          </View>
        </View>
      </FaceGridBackground>
    );
  },

  renderLoggedInButtons: function() {
    return (
      <View style={styles.containerButtons}>
        <Button style={styles.buttonPlay} onPress={this.props.onPlayPressed}>
          <Text>{I18n.t('buttons.play')}</Text>
        </Button>
        <Button style={styles.buttonPlay} onPress={this.props.onHighscorePressed}>
          <Text>{I18n.t('buttons.highscore')}</Text>
        </Button>
        <Link onPress={this.props.onLogoutPressed}>
          <Text>{I18n.t('buttons.logout')}</Text>
        </Link>
      </View>
    );
  },

  renderLoggedOutButtons: function() {
    return (
      <View style={styles.containerButtons}>
        <Text style={styles.loginText}>
          Improve your knowledge about all Liipers.
        </Text>
        <Text style={styles.loginText}>
          Get started by logging in with your liip account.
        </Text>
        <Button style={styles.buttonLogin} onPress={this.props.onLoginPressed}>
          Sign in with Google
        </Button>
      </View>
    );
  },

});

// Styles
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loginContainer: {
    flex: 1,
    backgroundColor: Variables.WHITERGBA80,
    margin: 10,
    padding: 20,
    borderRadius: 5,
  },
  logo: {
    flex: 2,
    width: 250,
    height: 282,
    alignSelf: 'center',
    marginBottom: 50,
  },
  loginText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
    textAlign: 'center'
  },

  containerButtons: {
    alignItems: 'stretch',
  },
  buttonLogin: {
    marginTop: 20
  },
  buttonLogout: {
  },
  buttonPlay: {
  },
  hidden: {
    width: 0,
    height: 0
  },
});

module.exports = LoginView;
