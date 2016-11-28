import { Ng2DashboardPage } from './app.po';

describe('ng2-dashboard App', function() {
  let page: Ng2DashboardPage;

  beforeEach(() => {
    page = new Ng2DashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
