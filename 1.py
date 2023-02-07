import importlib

def open_brave():
    try:
        import webbrowser
    except ImportError:
        print("The webbrowser library is not available. Please install it and try again.")
        return

    webbrowser.get("brave").open("https://www.google.com/")

open_brave()