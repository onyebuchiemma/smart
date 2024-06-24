document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const navLinks = document.getElementById('navLinks');

  hamburgerMenu.addEventListener('click', () => {
      navLinks.classList.toggle('hidden');
  });

  let shipments = JSON.parse(localStorage.getItem('shipments')) || [];

  document.getElementById('shipmentDetails').addEventListener('submit', function(event) {
      event.preventDefault();

      const senderName = document.getElementById('senderName').value;
      const senderAddress = document.getElementById('senderAddress').value;
      const senderEmail = document.getElementById('senderEmail').value;
      const senderPhone = document.getElementById('senderPhone').value;

      const receiverName = document.getElementById('receiverName').value;
      const receiverAddress = document.getElementById('receiverAddress').value;
      const receiverEmail = document.getElementById('receiverEmail').value;
      const receiverPhone = document.getElementById('receiverPhone').value;

      const shipmentType = document.getElementById('shipmentType').value;
      const shipmentWeight = document.getElementById('shipmentWeight').value;
      const courier = document.getElementById('courier').value;
      const packages = document.getElementById('packages').value;
      const mode = document.getElementById('mode').value;
      const product = document.getElementById('product').value;
      const carrier = document.getElementById('carrier').value;
      const carrierRefNumber = document.getElementById('carrierRefNumber').value;
      const comment = document.getElementById('comment').value;

      const deliveryDate = document.getElementById('deliveryDate').value;
      const departureDate = document.getElementById('departureDate').value;
      const paymentOption = document.getElementById('paymentOption').value;
      const totalFlight = document.getElementById('totalFlight').value;

      const trackingNumber = 'TRK' + Math.floor(Math.random() * 1000000);

      const shipmentDetails = {
          trackingNumber,
          senderName,
          senderAddress,
          senderEmail,
          senderPhone,
          receiverName,
          receiverAddress,
          receiverEmail,
          receiverPhone,
          shipmentType,
          shipmentWeight,
          courier,
          packages,
          mode,
          product,
          carrier,
          carrierRefNumber,
          comment,
          deliveryDate,
          departureDate,
          paymentOption,
          totalFlight,
      };

      shipments.push(shipmentDetails);
      localStorage.setItem('shipments', JSON.stringify(shipments));
      saveShipmentToAPI(shipmentDetails); // Placeholder for API call

      displayReceipt(shipmentDetails);
      updateStoredShipments();
  });

  document.getElementById('trackForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const trackingNumber = document.getElementById('trackingNumber').value;
      const shipment = shipments.find(shipment => shipment.trackingNumber === trackingNumber);

      if (shipment) {
          displayTrackingResult(shipment);
      } else {
          displayTrackingResult({ error: 'Tracking number not found' });
      }
  });

  document.getElementById('printReceiptBtn').addEventListener('click', () => {
      const printableReceipt = document.getElementById('printableReceipt').innerHTML;
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = printableReceipt;
      window.print();
      document.body.innerHTML = originalContents;
      location.reload();
  });

  const displayReceipt = (shipmentDetails) => {
      document.getElementById('printedTrackingNumber').innerText = shipmentDetails.trackingNumber;
      document.getElementById('printedSenderName').innerText = shipmentDetails.senderName;
      document.getElementById('printedSenderAddress').innerText = shipmentDetails.senderAddress;
      document.getElementById('printedSenderEmail').innerText = shipmentDetails.senderEmail;
      document.getElementById('printedSenderPhone').innerText = shipmentDetails.senderPhone;
      document.getElementById('printedReceiverName').innerText = shipmentDetails.receiverName;
      document.getElementById('printedReceiverAddress').innerText = shipmentDetails.receiverAddress;
      document.getElementById('printedReceiverEmail').innerText = shipmentDetails.receiverEmail;
      document.getElementById('printedReceiverPhone').innerText = shipmentDetails.receiverPhone;
      document.getElementById('printedShipmentType').innerText = shipmentDetails.shipmentType;
      document.getElementById('printedShipmentWeight').innerText = shipmentDetails.shipmentWeight;
      document.getElementById('printedCourier').innerText = shipmentDetails.courier;
      document.getElementById('printedPackages').innerText = shipmentDetails.packages;
      document.getElementById('printedMode').innerText = shipmentDetails.mode;
      document.getElementById('printedProduct').innerText = shipmentDetails.product;
      document.getElementById('printedCarrier').innerText = shipmentDetails.carrier;
      document.getElementById('printedCarrierRefNumber').innerText = shipmentDetails.carrierRefNumber;
      document.getElementById('printedComment').innerText = shipmentDetails.comment;
      document.getElementById('printedDeliveryDate').innerText = shipmentDetails.deliveryDate;
      document.getElementById('printedDepartureDate').innerText = shipmentDetails.departureDate;
      document.getElementById('printedPaymentOption').innerText = shipmentDetails.paymentOption;
      document.getElementById('printedTotalFlight').innerText = shipmentDetails.totalFlight;

      document.getElementById('receipt').classList.remove('hidden');
  };

  const displayTrackingResult = (result) => {
      const trackingResult = document.getElementById('trackingResult');
      trackingResult.innerHTML = '';

      if (result.error) {
          trackingResult.innerHTML = `<p>${result.error}</p>`;
      } else {
          trackingResult.innerHTML = `
              <p><strong>Tracking Number:</strong> ${result.trackingNumber}</p>
              <p><strong>Sender Name:</strong> ${result.senderName}</p>
              <p><strong>Receiver Name:</strong> ${result.receiverName}</p>
              <p><strong>Sender Address:</strong> ${result.senderAddress}</p>
              <p><strong>Receiver Address:</strong> ${result.receiverAddress}</p>
          `;
      }

      trackingResult.classList.remove('hidden');
  };

  const updateStoredShipments = () => {
      const storedShipments = document.getElementById('storedShipments');
      storedShipments.innerHTML = '';

      shipments.forEach((shipment) => {
          const shipmentContainer = document.createElement('div');
          shipmentContainer.classList.add('receipt-container');

          shipmentContainer.innerHTML = `
              <h4>Shipment: ${shipment.trackingNumber}</h4>
              <p><strong>Sender:</strong> ${shipment.senderName}</p>
              <p><strong>Receiver:</strong> ${shipment.receiverName}</p>
              <p><strong>Departure Date:</strong> ${shipment.departureDate}</p>
              <p><strong>Delivery Date:</strong> ${shipment.deliveryDate}</p>
              <div class="line"></div>
          `;

          shipmentContainer.addEventListener('click', () => {
              shipmentContainer.innerHTML += `
                  <p><strong>Sender Address:</strong> ${shipment.senderAddress}</p>
                  <p><strong>Sender Email:</strong> ${shipment.senderEmail}</p>
                  <p><strong>Sender Phone:</strong> ${shipment.senderPhone}</p>
                  <p><strong>Receiver Address:</strong> ${shipment.receiverAddress}</p>
                  <p><strong>Receiver Email:</strong> ${shipment.receiverEmail}</p>
                  <p><strong>Receiver Phone:</strong> ${shipment.receiverPhone}</p>
                  <p><strong>Shipment Type:</strong> ${shipment.shipmentType}</p>
                  <p><strong>Weight:</strong> ${shipment.shipmentWeight}</p>
                  <p><strong>Courier:</strong> ${shipment.courier}</p>
                  <p><strong>Packages:</strong> ${shipment.packages}</p>
                  <p><strong>Mode:</strong> ${shipment.mode}</p>
                  <p><strong>Product:</strong> ${shipment.product}</p>
                  <p><strong>Carrier:</strong> ${shipment.carrier}</p>
                  <p><strong>Carrier Ref Number:</strong> ${shipment.carrierRefNumber}</p>
                  <p><strong>Comment:</strong> ${shipment.comment}</p>
                  <p><strong>Payment Option:</strong> ${shipment.paymentOption}</p>
                  <p><strong>Total Flight:</strong> ${shipment.totalFlight}</p>
              `;
          });

          storedShipments.appendChild(shipmentContainer);
      });
  };

  const saveShipmentToAPI = (shipmentDetails) => {
      // Placeholder function for API call to save shipment details
      // Implement actual API call here
      console.log('Saving shipment to API...', shipmentDetails);
  };

  updateStoredShipments();
});
