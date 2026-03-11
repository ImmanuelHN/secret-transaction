/* ST — Secret Transactions | Service Worker v1.0
   Upload this file to GitHub alongside index.html
   This enables real Android Chrome notifications */

self.addEventListener('install', function(e) { self.skipWaiting(); });
self.addEventListener('activate', function(e) { e.waitUntil(clients.claim()); });

self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type:'window', includeUncontrolled:true }).then(function(list) {
      if (list.length > 0) return list[0].focus();
      return clients.openWindow('./');
    })
  );
});

/* Main thread sends SHOW_NOTIFICATION message → SW shows it */
self.addEventListener('message', function(e) {
  if (!e.data || e.data.type !== 'SHOW_NOTIFICATION') return;
  e.waitUntil(
    self.registration.showNotification(e.data.title || 'ST', e.data.opts || {})
  );
});

self.addEventListener('push', function(e) {});
