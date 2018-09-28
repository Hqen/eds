using Xamarin.Forms;
using Mobile.Droid;

[assembly: Dependency(typeof(BaseUrl_Android))]
namespace Mobile.Droid    // пространство имен может отличаться
{
    public class BaseUrl_Android : IBaseUrl
    {
        public string Get()
        {
            return "file:///android_asset/";
        }
    }
}