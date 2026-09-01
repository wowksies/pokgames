/**
 * Mock Poki SDK - replaces real poki-sdk.js so the game runs without ads/tracking.
 */
(function () {
  var noop = function() {};
  var resolveVoid = function() { return Promise.resolve(); };
  var resolveTrue = function() { return Promise.resolve(true); };
  var resolveFalse = function() { return Promise.resolve(false); };

  window.PokiSDK = {
    init: resolveVoid,
    gameLoadingStart: noop,
    gameLoadingFinished: noop,
    gameplayStart: noop,
    gameplayStop: noop,
    commercialBreak: resolveVoid,
    rewardedBreak: resolveTrue,
    displayAd: resolveVoid,
    setDebug: noop,
    measure: noop,
    setScore: noop,
    captureError: noop,
    getURLParam: function() { return null; },
    isAdBlocked: resolveFalse,
    shareableURL: function() { return ''; },
    shareFacebook: noop,
    shareTwitter: noop,
    on: noop,
    off: noop,
    emit: noop,
  };
})();