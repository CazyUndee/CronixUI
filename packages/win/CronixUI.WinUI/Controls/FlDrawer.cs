using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls
{
    /// <summary>
    /// FlDrawer - Slide-in panel.
    /// </summary>
    public class FlDrawer : ContentControl
    {
        public static readonly DependencyProperty IsOpenProperty =
            DependencyProperty.Register(nameof(IsOpen), typeof(bool), typeof(FlDrawer), new PropertyMetadata(false));

        public static readonly DependencyProperty DrawerTitleProperty =
            DependencyProperty.Register(nameof(DrawerTitle), typeof(string), typeof(FlDrawer), new PropertyMetadata(""));

        public static readonly DependencyProperty SideProperty =
            DependencyProperty.Register(nameof(Side), typeof(string), typeof(FlDrawer), new PropertyMetadata("Right"));

        public bool IsOpen
        {
            get => (bool)GetValue(IsOpenProperty);
            set => SetValue(IsOpenProperty, value);
        }

        public string DrawerTitle
        {
            get => (string)GetValue(DrawerTitleProperty);
            set => SetValue(DrawerTitleProperty, value);
        }

        public string Side
        {
            get => (string)GetValue(SideProperty);
            set => SetValue(SideProperty, value);
        }

        public FlDrawer()
        {
            DefaultStyleKey = typeof(FlDrawer);
        }

        public void OpenDrawer() => IsOpen = true;
        public void CloseDrawer() => IsOpen = false;
        public void ToggleDrawer() => IsOpen = !IsOpen;
    }
}
