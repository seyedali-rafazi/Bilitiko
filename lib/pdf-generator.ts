// PDF Generator Utility for Ticket Downloads
// Uses browser's print functionality to generate professional PDFs

export interface TicketData {
  trackingCode: string;
  bookingDate: string;
  passengers: Array<{
    firstName: string;
    lastName: string;
    nationalId: string;
    birthDate?: string;
    gender?: string;
  }>;
  flight?: {
    flightNumber: string;
    airline: string;
    origin: string;
    destination: string;
    departureDate: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    class: string;
  };
  transport?: {
    type: 'bus' | 'train';
    company: string;
    origin: string;
    destination: string;
    departureDate: string;
    departureTime: string;
    arrivalTime: string;
    seatNumbers?: string[];
  };
  contact: {
    email: string;
    phone: string;
  };
  pricing: {
    basePrice: number;
    tax: number;
    serviceFee: number;
    total: number;
  };
}

export function generateTicketHTML(data: TicketData): string {
  const isRTL = true; // Persian is RTL
  const transportType = data.flight ? 'پرواز' : data.transport?.type === 'bus' ? 'اتوبوس' : 'قطار';
  
  return `
<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>بلیط ${transportType} - ${data.trackingCode}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f5f5f5;
      padding: 20px;
      direction: rtl;
    }
    
    .ticket-container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .ticket-header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    
    .ticket-header h1 {
      font-size: 28px;
      margin-bottom: 10px;
      font-weight: bold;
    }
    
    .ticket-header .tracking-code {
      font-size: 18px;
      background: rgba(255, 255, 255, 0.2);
      padding: 8px 20px;
      border-radius: 20px;
      display: inline-block;
      margin-top: 10px;
    }
    
    .ticket-body {
      padding: 30px;
    }
    
    .section {
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px dashed #e5e7eb;
    }
    
    .section:last-child {
      border-bottom: none;
    }
    
    .section-title {
      font-size: 18px;
      font-weight: bold;
      color: #1e40af;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .section-title::before {
      content: '';
      width: 4px;
      height: 20px;
      background: #3b82f6;
      border-radius: 2px;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
    
    .info-item {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    
    .info-label {
      font-size: 12px;
      color: #6b7280;
      font-weight: 500;
    }
    
    .info-value {
      font-size: 15px;
      color: #111827;
      font-weight: 600;
    }
    
    .route-display {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      background: #f9fafb;
      border-radius: 8px;
      margin: 15px 0;
    }
    
    .route-city {
      text-align: center;
      flex: 1;
    }
    
    .route-city-name {
      font-size: 20px;
      font-weight: bold;
      color: #111827;
      margin-bottom: 5px;
    }
    
    .route-time {
      font-size: 16px;
      color: #3b82f6;
      font-weight: 600;
    }
    
    .route-arrow {
      flex: 0 0 100px;
      text-align: center;
      position: relative;
    }
    
    .route-arrow::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 2px;
      background: #3b82f6;
      transform: translateY(-50%);
    }
    
    .route-arrow::after {
      content: '✈';
      position: relative;
      z-index: 1;
      background: white;
      padding: 0 10px;
      font-size: 20px;
    }
    
    .passenger-card {
      background: #f9fafb;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 10px;
    }
    
    .passenger-name {
      font-size: 16px;
      font-weight: bold;
      color: #111827;
      margin-bottom: 8px;
    }
    
    .passenger-details {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      font-size: 13px;
    }
    
    .price-summary {
      background: #f9fafb;
      padding: 20px;
      border-radius: 8px;
    }
    
    .price-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      font-size: 14px;
    }
    
    .price-row.total {
      border-top: 2px solid #e5e7eb;
      margin-top: 10px;
      padding-top: 15px;
      font-size: 18px;
      font-weight: bold;
      color: #1e40af;
    }
    
    .ticket-footer {
      background: #f9fafb;
      padding: 20px 30px;
      text-align: center;
      font-size: 12px;
      color: #6b7280;
    }
    
    .qr-code-section {
      text-align: center;
      padding: 20px;
      background: #f9fafb;
      border-radius: 8px;
    }
    
    .qr-placeholder {
      width: 150px;
      height: 150px;
      margin: 0 auto;
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #6b7280;
    }
    
    @media print {
      body {
        background: white;
        padding: 0;
      }
      
      .ticket-container {
        box-shadow: none;
        max-width: 100%;
      }
    }
    
    @page {
      size: A4;
      margin: 15mm;
    }
  </style>
</head>
<body>
  <div class="ticket-container">
    <!-- Header -->
    <div class="ticket-header">
      <h1>🎫 بلیط ${transportType}</h1>
      <div class="tracking-code">کد پیگیری: ${data.trackingCode}</div>
    </div>
    
    <!-- Body -->
    <div class="ticket-body">
      <!-- Flight/Transport Details -->
      <div class="section">
        <div class="section-title">اطلاعات ${transportType}</div>
        
        ${data.flight ? `
          <div class="route-display">
            <div class="route-city">
              <div class="route-city-name">${data.flight.origin}</div>
              <div class="route-time">${data.flight.departureTime}</div>
            </div>
            <div class="route-arrow"></div>
            <div class="route-city">
              <div class="route-city-name">${data.flight.destination}</div>
              <div class="route-time">${data.flight.arrivalTime}</div>
            </div>
          </div>
          
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">شماره پرواز</div>
              <div class="info-value">${data.flight.flightNumber}</div>
            </div>
            <div class="info-item">
              <div class="info-label">ایرلاین</div>
              <div class="info-value">${data.flight.airline}</div>
            </div>
            <div class="info-item">
              <div class="info-label">تاریخ پرواز</div>
              <div class="info-value">${data.flight.departureDate}</div>
            </div>
            <div class="info-item">
              <div class="info-label">مدت پرواز</div>
              <div class="info-value">${data.flight.duration}</div>
            </div>
            <div class="info-item">
              <div class="info-label">کلاس پرواز</div>
              <div class="info-value">${data.flight.class}</div>
            </div>
          </div>
        ` : data.transport ? `
          <div class="route-display">
            <div class="route-city">
              <div class="route-city-name">${data.transport.origin}</div>
              <div class="route-time">${data.transport.departureTime}</div>
            </div>
            <div class="route-arrow"></div>
            <div class="route-city">
              <div class="route-city-name">${data.transport.destination}</div>
              <div class="route-time">${data.transport.arrivalTime}</div>
            </div>
          </div>
          
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">شرکت</div>
              <div class="info-value">${data.transport.company}</div>
            </div>
            <div class="info-item">
              <div class="info-label">تاریخ حرکت</div>
              <div class="info-value">${data.transport.departureDate}</div>
            </div>
            ${data.transport.seatNumbers ? `
              <div class="info-item">
                <div class="info-label">شماره صندلی</div>
                <div class="info-value">${data.transport.seatNumbers.join(', ')}</div>
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>
      
      <!-- Passengers -->
      <div class="section">
        <div class="section-title">مسافران (${data.passengers.length} نفر)</div>
        ${data.passengers.map((passenger, index) => `
          <div class="passenger-card">
            <div class="passenger-name">${index + 1}. ${passenger.firstName} ${passenger.lastName}</div>
            <div class="passenger-details">
              <div>
                <div class="info-label">کد ملی</div>
                <div class="info-value">${passenger.nationalId}</div>
              </div>
              ${passenger.birthDate ? `
                <div>
                  <div class="info-label">تاریخ تولد</div>
                  <div class="info-value">${passenger.birthDate}</div>
                </div>
              ` : ''}
              ${passenger.gender ? `
                <div>
                  <div class="info-label">جنسیت</div>
                  <div class="info-value">${passenger.gender === 'male' ? 'مرد' : 'زن'}</div>
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
      
      <!-- Contact Information -->
      <div class="section">
        <div class="section-title">اطلاعات تماس</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">ایمیل</div>
            <div class="info-value">${data.contact.email}</div>
          </div>
          <div class="info-item">
            <div class="info-label">شماره تماس</div>
            <div class="info-value">${data.contact.phone}</div>
          </div>
        </div>
      </div>
      
      <!-- Pricing -->
      <div class="section">
        <div class="section-title">جزئیات مالی</div>
        <div class="price-summary">
          <div class="price-row">
            <span>قیمت پایه</span>
            <span>${data.pricing.basePrice.toLocaleString('fa-IR')} تومان</span>
          </div>
          <div class="price-row">
            <span>مالیات</span>
            <span>${data.pricing.tax.toLocaleString('fa-IR')} تومان</span>
          </div>
          <div class="price-row">
            <span>کارمزد خدمات</span>
            <span>${data.pricing.serviceFee.toLocaleString('fa-IR')} تومان</span>
          </div>
          <div class="price-row total">
            <span>مجموع</span>
            <span>${data.pricing.total.toLocaleString('fa-IR')} تومان</span>
          </div>
        </div>
      </div>
      
      <!-- QR Code -->
      <div class="section">
        <div class="qr-code-section">
          <div class="qr-placeholder">
            <div>
              <div style="font-size: 40px; margin-bottom: 10px;">📱</div>
              <div>کد QR بلیط</div>
              <div style="margin-top: 5px; font-weight: bold;">${data.trackingCode}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="ticket-footer">
      <p><strong>بیلیتیکو</strong> - سامانه خرید آنلاین بلیط</p>
      <p style="margin-top: 10px;">تاریخ صدور: ${data.bookingDate}</p>
      <p style="margin-top: 5px;">این بلیط الکترونیکی معتبر است و نیازی به چاپ ندارد.</p>
      <p style="margin-top: 10px; font-size: 11px;">
        لطفاً این بلیط را همراه با مدرک شناسایی معتبر در زمان سفر به همراه داشته باشید.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

export function downloadTicketPDF(data: TicketData): void {
  // Create a new window with the ticket HTML
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    alert('لطفاً مسدودکننده پاپ‌آپ را غیرفعال کنید.');
    return;
  }
  
  // Write the HTML content
  printWindow.document.write(generateTicketHTML(data));
  printWindow.document.close();
  
  // Wait for content to load, then trigger print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
      // Close the window after printing (optional)
      // printWindow.close();
    }, 250);
  };
}

// Alternative: Download as HTML file
export function downloadTicketHTML(data: TicketData): void {
  const html = generateTicketHTML(data);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ticket-${data.trackingCode}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

