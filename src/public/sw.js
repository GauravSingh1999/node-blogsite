self.addEventListener('push', event => {
  const data = event.data.json()
  self.registration.showNotification(data.notification.title, {
    title: data.title,
    body: 'Yay it works!'
  })
})
