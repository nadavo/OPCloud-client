import { Opcloud2Page } from './app.po';

describe('opcloud2 App', function() {
  let page: Opcloud2Page;

  beforeEach(() => {
    page = new Opcloud2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
