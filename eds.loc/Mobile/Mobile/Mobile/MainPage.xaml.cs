using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace Mobile
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
            var urlSource = new UrlWebViewSource
            {
                Url = System.IO.Path.Combine(DependencyService.Get<IBaseUrl>().Get(), "index.html")
            };
            var webView = new WebView
            {
                Source = urlSource
            };
            Content = webView;
        }
    }
    public interface IBaseUrl { string Get(); }
}
